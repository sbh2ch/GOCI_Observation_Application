package kr.goci.goa.log.service;

import kr.goci.goa.log.domain.DownloadLog;
import kr.goci.goa.log.repository.DownloadLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class LogService {
    @Autowired
    private DownloadLogRepository logRepository;

    public DownloadLog insertDownloadlog(String filename, String ip, String outputType, String fileType) {
        DownloadLog log = new DownloadLog();
        log.setDate(new Date());
        log.setFilename(filename);
        log.setIp(ip);
        log.setOutputType(outputType);
        log.setType(fileType);

        return logRepository.save(log);
    }
}
