package kabum.demo.Controller;

import kabum.demo.Model.Category;
import kabum.demo.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/categorias")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> criar(@RequestBody Category category) {
        Category novaCategoria = categoryService.criar(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
    }

    @GetMapping
    public ResponseEntity<List<Category>> listar() {
        List<Category> categorias = categoryService.listarTodas();
        return ResponseEntity.ok(categorias);
    }
}