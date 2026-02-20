package kabum.demo.Controller;

import kabum.demo.Service.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class EmailVerificationController {

    @Autowired
    private EmailVerificationService emailVerificationService;

    @GetMapping("/verificar-email")
    public ResponseEntity<?> verificar(@RequestParam String token) {
        boolean sucesso = emailVerificationService.verificarToken(token);
        if (sucesso) {
            return ResponseEntity.ok(Map.of("message", "E-mail verificado com sucesso!"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Token inválido ou expirado."));
        }
    }
}