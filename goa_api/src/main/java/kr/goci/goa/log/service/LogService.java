package kr.goci.goa.log.service;

import kr.goci.goa.log.domain.Log;
import kr.goci.goa.log.repository.DownLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class LogService {
    @Autowired
    private DownLogRepository logRepository;

    public Log.Down insertDownloadlog(String filename, String ip, String outputType, String fileType) {
        Log.Down log = new Log.Down();
        log.setDate(new Date());
        log.setFilename(filename);
        log.setIp(ip);
        log.setOutputType(outputType);
        log.setType(fileType);

        return logRepository.save(log);
    }
}
