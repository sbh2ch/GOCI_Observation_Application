package kr.goci.goa.file.repository;

import kr.goci.goa.file.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findByHashcode(String hashcode);
}
