package kabum.demo.Service;

import kabum.demo.Model.EmailVerificationToken;
import kabum.demo.Model.Users;
import kabum.demo.Repository.EmailVerificationTokenRepository;
import kabum.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmailVerificationService {

    @Autowired
    private EmailVerificationTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Transactional
    public void enviarEmailVerificacao(Users user, String urlBase) {
        tokenRepository.deleteByUser_Id(user.getId());

        String token = UUID.randomUUID().toString();
        EmailVerificationToken verToken = new EmailVerificationToken();
        verToken.setToken(token);
        verToken.setUser(user);
        verToken.setExpiracao(LocalDateTime.now().plusHours(24));
        tokenRepository.save(verToken);

        String link = urlBase + "/verify-email?token=" + token;

        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(user.getEmail());
        mensagem.setSubject("Confirme seu cadastro - KaBuM!");
        mensagem.setText("Olá, " + user.getName() + "!\n\n"
                + "Clique no link abaixo para verificar seu e-mail:\n\n"
                + link + "\n\n"
                + "O link expira em 24 horas.\n\n"
                + "Se você não criou uma conta, ignore este e-mail.");
        mailSender.send(mensagem);
    }

    @Transactional
    public boolean verificarToken(String token) {
        Optional<EmailVerificationToken> opt = tokenRepository.findByToken(token);
        if (opt.isEmpty()) return false;

        EmailVerificationToken verToken = opt.get();
        if (verToken.isExpirado()) return false;

        Users user = verToken.getUser();
        user.setEmailVerificado(true);
        userRepository.save(user);

        tokenRepository.delete(verToken);
        return true;
    }
}