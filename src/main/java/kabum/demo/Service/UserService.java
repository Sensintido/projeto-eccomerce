package kabum.demo.Service;

import kabum.demo.Model.Users;
import kabum.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Users salvar(Users user) {
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
}
