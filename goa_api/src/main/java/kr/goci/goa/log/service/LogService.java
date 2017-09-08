package kr.goci.goa.log.service;

import kr.goci.goa.log.repository.DownLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LogService {
    @Autowired
    private DownLogRepository logRepository;

}
