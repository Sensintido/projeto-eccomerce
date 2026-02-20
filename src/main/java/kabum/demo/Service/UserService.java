package kabum.demo.Service;

import kabum.demo.Dto.RegisterDTO;
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

    // ✅ Recebe RegisterDTO — senha NUNCA será nula pois o DTO tem @NotBlank
    public Users salvar(RegisterDTO dto) {
        Users user = new Users();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setCpf(dto.getCpf());
        user.setPhone(dto.getPhone());
        // ✅ Senha nunca será nula aqui pois o DTO garante @NotBlank
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
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
        // ✅ Checagem extra de null antes de chamar passwordEncoder.matches
        if (user == null || user.getPassword() == null) return false;
        return passwordEncoder.matches(senhaDigitada, user.getPassword());
    }
}