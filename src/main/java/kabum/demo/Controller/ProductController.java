package kabum.demo.Controller;

import kabum.demo.Model.Product;
import kabum.demo.Service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/produtos")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Product> criar(@Valid @RequestBody Product product) {
        Product novoProduto = productService.criar(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    @GetMapping
    public ResponseEntity<List<Product>> listarTodos() {
        List<Product> produtos = productService.listarTodos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> buscarPorId(@PathVariable Long id) {
        return productService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Product product) {
        return ResponseEntity.ok(productService.atualizar(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        productService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categoria/{nome}")
    public ResponseEntity<List<Product>> listarPorCategoria(@PathVariable String nome) {
        List<Product> produtos = productService.listarPorCategoria(nome);
        return ResponseEntity.ok(produtos);
    }


    @GetMapping("/busca")
    public ResponseEntity<List<Product>> buscar(@RequestParam String nome) {
        List<Product> produtos = productService.buscarPorNome(nome);
        return ResponseEntity.ok(produtos);
    }
}