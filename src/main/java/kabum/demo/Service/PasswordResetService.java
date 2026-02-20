package kabum.demo.Service;

import kabum.demo.Model.PasswordResetToken;
import kabum.demo.Model.Users;
import kabum.demo.Repository.PasswordResetTokenRepository;
import kabum.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public boolean enviarEmailRecuperacao(String email, String urlBase) {
        Users user = userRepository.findByEmail(email);
        if (user == null) return false;

        tokenRepository.deleteByUser_Id(user.getId());

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiracao(LocalDateTime.now().plusMinutes(30));
        tokenRepository.save(resetToken);

        String link = urlBase + "/reset-password?token=" + token;

        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(email);
        mensagem.setSubject("Recuperação de senha - KaBuM");
        mensagem.setText("Olá, " + user.getName() + "!\n\n"
                + "Clique no link abaixo para redefinir sua senha:\n\n"
                + link + "\n\n"
                + "O link expira em 30 minutos.\n\n"
                + "Se você não solicitou a recuperação, ignore este e-mail.");
        mailSender.send(mensagem);

        return true;
    }

    @Transactional
    public boolean redefinirSenha(String token, String novaSenha) {
        Optional<PasswordResetToken> opt = tokenRepository.findByToken(token);
        if (opt.isEmpty()) return false;

        PasswordResetToken resetToken = opt.get();
        if (resetToken.isExpirado()) return false;

        Users user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(novaSenha));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
        return true;
    }
}