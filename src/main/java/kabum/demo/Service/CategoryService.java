package kabum.demo.Service;

import kabum.demo.Model.Category;
import kabum.demo.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category criar(Category category){
        return categoryRepository.save(category);
    }

    public List<Category> listarTodas() {
        return categoryRepository.findAll();
    }
}
