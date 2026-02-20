package kabum.demo.Service;

import kabum.demo.Model.Users;
import kabum.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users salvar(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<Users> listarTodos() {
        return userRepository.findAll();
    }

    public Users buscarPorEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean existePorEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existePorCpf(String cpf) {
        return userRepository.existsByCpf(cpf);
    }

    public boolean validarLogin(String email, String senhaDigitada) {
        Users user = buscarPorEmail(email);
        if (user == null) return false;
        return passwordEncoder.matches(senhaDigitada, user.getPassword());
    }
}