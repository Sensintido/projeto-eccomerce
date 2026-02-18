package kabum.demo.Repository;

import kabum.demo.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Esta query garante que o Spring procure o nome dentro da lista de categorias
    @Query("SELECT p FROM Product p JOIN p.categories c WHERE LOWER(c.name) = LOWER(:name)")
    List<Product> findByCategoryName(@Param("name") String name);

    List<Product> findByNameContainingIgnoreCase(String name);
}