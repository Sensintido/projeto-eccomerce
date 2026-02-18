package kabum.demo.Service;

import kabum.demo.Model.Category;
import kabum.demo.Model.Product;
import kabum.demo.Repository.CategoryRepository;
import kabum.demo.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository CategoryRepository;

    public Product criar(Product p) {
        return productRepository.save(p);
    }

    public List<Product> listarTodos() {
        return productRepository.findAll();
    }

    public Optional<Product> buscarPorId(Long id) {
        return productRepository.findById(id);
    }

    public void deletar(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        }
    }

    public List<Product> listarPorCategoria(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }

    public Product atualizar(Long id, Product produtoAtualizado) {
        return productRepository.findById(id).map(produtoExistente -> {
            produtoExistente.setName(produtoAtualizado.getName());
            produtoExistente.setPreco(produtoAtualizado.getPreco());
            produtoExistente.setQuantidade(produtoAtualizado.getQuantidade());
            produtoExistente.setDescricao(produtoAtualizado.getDescricao());
            produtoExistente.setCategories(produtoAtualizado.getCategories());
            produtoExistente.setPrecoOriginal(produtoAtualizado.getPrecoOriginal());
            produtoExistente.setDesconto(produtoAtualizado.getDesconto());
            produtoExistente.setRating(produtoAtualizado.getRating());
            produtoExistente.setReviews(produtoAtualizado.getReviews());
            produtoExistente.setImageUrl(produtoAtualizado.getImageUrl());
            produtoExistente.setMarca(produtoAtualizado.getMarca());
            produtoExistente.setModelo(produtoAtualizado.getModelo());
            produtoExistente.setGarantia(produtoAtualizado.getGarantia());
            produtoExistente.setCor(produtoAtualizado.getCor());
            produtoExistente.setPeso(produtoAtualizado.getPeso());
            produtoExistente.setDimensoes(produtoAtualizado.getDimensoes());

            return productRepository.save(produtoExistente);
        }).orElseThrow(() -> new RuntimeException("Produto não encontrado com o id: " + id));
    }
}