package kabum.demo.Controller;

import kabum.demo.Model.Users;
import kabum.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Users user) {
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
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    @GetMapping
    public List<Users> listar() {
        return userService.listarTodos();
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users loginData) {
        Users user = userService.buscarPorEmail(loginData.getEmail());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "E-mail ou senha inválidos"));
        }
    }
}