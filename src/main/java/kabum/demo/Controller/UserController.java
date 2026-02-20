package kabum.demo.Controller;

import kabum.demo.Model.Users;
import kabum.demo.Service.EmailVerificationService;
import kabum.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailVerificationService emailVerificationService;

    @Value("${app.url:http://localhost:5173}")
    private String appUrl;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody @Valid Users user) {
        if (userService.existePorEmail(user.getEmail())) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", "Usuário já existe com este e-mail"));
        }
        if (userService.existePorCpf(user.getCpf())) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", "CPF já cadastrado"));
        }

        Users novoUsuario = userService.salvar(user);
        emailVerificationService.enviarEmailVerificacao(novoUsuario, appUrl);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("message", "Cadastro realizado! Verifique seu e-mail para ativar a conta."));
    }

    @GetMapping
    public List<Users> listar() {
        return userService.listarTodos();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users loginData) {
        Users user = userService.buscarPorEmail(loginData.getEmail());

        if (user == null || !userService.validarLogin(loginData.getEmail(), loginData.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "E-mail ou senha inválidos"));
        }

        if (!user.isEmailVerificado()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("message", "Conta não verificada. Verifique seu e-mail antes de entrar."));
        }

        return ResponseEntity.ok(user);
    }
}