package kabum.demo.Controller;

import kabum.demo.Dto.LoginDTO;
import kabum.demo.Dto.RegisterDTO;
import kabum.demo.Dto.UserResponseDTO;
import kabum.demo.Model.Users;
import kabum.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
// ✅ Troque pela URL real do seu frontend no Vercel
@CrossOrigin(origins = {"https://magitech-store.vercel.app", "http://localhost:5173"})
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ CADASTRO — cria conta direto, sem verificação de e-mail
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody @Valid RegisterDTO dto) {
        if (userService.existePorEmail(dto.getEmail())) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", "Usuário já existe com este e-mail"));
        }
        if (userService.existePorCpf(dto.getCpf())) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", "CPF já cadastrado"));
        }

        userService.salvar(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("message", "Cadastro realizado com sucesso! Faça login para continuar."));
    }

    // ✅ LOGIN — simples, sem checar emailVerificado
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO loginData) {
        Users user = userService.buscarPorEmail(loginData.getEmail());

        if (user == null || !userService.validarLogin(loginData.getEmail(), loginData.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "E-mail ou senha inválidos"));
        }

        // ✅ Retorna UserResponseDTO — sem senha
        UserResponseDTO response = new UserResponseDTO();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setCpf(user.getCpf());
        response.setPhone(user.getPhone());

        return ResponseEntity.ok(response);
    }
}