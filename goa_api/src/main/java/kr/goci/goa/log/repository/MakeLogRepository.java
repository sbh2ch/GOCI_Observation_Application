package kr.goci.goa.log.repository;

import kr.goci.goa.log.domain.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MakeLogRepository extends JpaRepository<Log.Products, Long> {
    Log.Products findByHashcode(String hashcode);
}
