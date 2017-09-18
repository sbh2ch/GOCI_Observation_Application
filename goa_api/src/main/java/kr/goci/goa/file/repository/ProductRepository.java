package kr.goci.goa.file.repository;

import kr.goci.goa.file.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by sonbyeonghwa on 2017. 9. 18..
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(String productId);
}
