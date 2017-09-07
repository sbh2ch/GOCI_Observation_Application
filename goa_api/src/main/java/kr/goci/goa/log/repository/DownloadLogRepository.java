package kr.goci.goa.log.repository;

import kr.goci.goa.log.domain.DownloadLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DownloadLogRepository extends JpaRepository<DownloadLog, Long> {
}
