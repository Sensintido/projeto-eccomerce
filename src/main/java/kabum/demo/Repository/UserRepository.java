package kabum.demo.Repository;

import kabum.demo.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
    Users findByCpf(String cpf);
    List<Users> findByNameContaining(String name);
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
}