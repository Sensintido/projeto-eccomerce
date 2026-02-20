package kabum.demo.Controller;

import kabum.demo.Service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @Value("${app.url:http://localhost:5173}")
    private String appUrl;

    @PostMapping("/esqueci-senha")
    public ResponseEntity<String> esqueceuSenha(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        boolean enviado = passwordResetService.enviarEmailRecuperacao(email, appUrl);

        if (enviado) {
            return ResponseEntity.ok("E-mail de recuperação enviado!");
        } else {
            return ResponseEntity.badRequest().body("E-mail não encontrado.");
        }
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<String> redefinirSenha(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String novaSenha = body.get("novaSenha");
        boolean sucesso = passwordResetService.redefinirSenha(token, novaSenha);

        if (sucesso) {
            return ResponseEntity.ok("Senha redefinida com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Token inválido ou expirado.");
        }
    }
}