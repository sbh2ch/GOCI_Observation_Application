package kr.goci.goa.file.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.goci.goa.commons.ErrorResponse;
import kr.goci.goa.commons.Exception.SQLNotExistException;
import kr.goci.goa.commons.Exception.OutOfRangeException;
import kr.goci.goa.file.domain.ImageDto;
import kr.goci.goa.file.domain.ProductDto;
import kr.goci.goa.file.service.FileService;
import kr.goci.goa.log.domain.Log;
import kr.goci.goa.log.repository.DownLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;

@CrossOrigin("*")
@RestController
@Slf4j
@Transactional
public class FileController {
    @Autowired
    private DownLogRepository downLogRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/api/images/hashes/{hashcode}")
    public ResponseEntity displayImage(@PathVariable String hashcode) {
        byte[] image;

        try {
            image = fileService.displayImage(hashcode);
        } catch (IOException e) {
            log.error("image.file.IO.Exception, {}", e.toString());

            return new ResponseEntity<>(new ErrorResponse("잘못 된 요청입니다.", "bad.request.show.image"), HttpStatus.BAD_REQUEST);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(image.length);

        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/api/images", produces = "application/json;charset=UTF-8")
    public ResponseEntity makeImage(@RequestBody ImageDto.Create image) {

        ImageDto.Response res = null;

        try {
            res = fileService.makeImage(image);
        } catch (IOException e) {
            log.error("image create error : {}", e.toString());
            return new ResponseEntity<>(new ErrorResponse("잘못 된 요청입니다.", "bad.request.create.image"), HttpStatus.BAD_REQUEST);
        }

        String result = null;

        try {
            result = objectMapper.writeValueAsString(res);
        } catch (JsonProcessingException e) {
            log.error("json parsing error : {}", e.toString());
            return new ResponseEntity<>(new ErrorResponse("파싱 실패", "parsing.fail"), HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping(value = "/api/products", produces = "application/json;charset=UTF-8")
    public ResponseEntity makeProduct(@RequestBody ProductDto.Create product) {
        ProductDto.Response res;

        try{
            res = fileService.makeProduct(product);
        } catch (Exception e) {
            log.error("product create error : {}", e.toString());
            return new ResponseEntity<>(new ErrorResponse("잘못 된 요청입니다.", "bad.request.create.product"), HttpStatus.BAD_REQUEST);
        }

        String result = null;
        try {
            result = objectMapper.writeValueAsString(res);
        } catch (JsonProcessingException e) {
            log.error("json parsing error : {}", e.toString());
            return new ResponseEntity<>(new ErrorResponse("파싱 실패", "parsing.fail"), HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

//    @PostMapping(value = "/api/productsss", produces = "application/json;charset=UTF-8")
//    public ResponseEntity makeProducts(@RequestBody ProductDto.Create product) {
//        ProductDto.Response res;
//        try {
//            res = fileService.makeProduct(product);
//        } catch (Exception e) {
//            log.error("product create error : {}", e.toString());
//            return new ResponseEntity<>(new ErrorResponse("잘못 된 요청입니다.", "bad.request.create.product"), HttpStatus.BAD_REQUEST);
//        }
//
//        String result = null;
//        try {
//            result = objectMapper.writeValueAsString(res);
//        } catch (JsonProcessingException e) {
//            log.error("json parsing error : {}", e.toString());
//            return new ResponseEntity<>(new ErrorResponse("파싱 실패", "parsing.fail"), HttpStatus.CONFLICT);
//        }
//
//        return new ResponseEntity<>(result, HttpStatus.CREATED);
//    }

    @GetMapping(value = "/api/products/hashes/{hash}")
    public ResponseEntity getProduct(@PathVariable String hash, HttpServletRequest request) {
        File file = fileService.downloadProduct(hash);


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/x-msdownlpad"));
        headers.setContentLength(file.length());
        headers.setContentDispositionFormData("attachment", file.getName());

        try {
            InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(file));

            Log.Down downloadLog = new Log.Down();
            downloadLog.setDate(new Date());
            downloadLog.setIp(request.getRemoteAddr());
            downloadLog.setHash(hash);

            downLogRepository.save(downloadLog);
            log.info("download log : {}", downloadLog.toString());

            return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.OK);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse("잘못 된 요청입니다.", "bad.request.download.product"), HttpStatus.BAD_REQUEST);
        }

    }

    @ExceptionHandler(SQLNotExistException.class)
    public ResponseEntity handleSQLNotExistException(SQLNotExistException e) {

        return new ResponseEntity<>(new ErrorResponse(e.getFilename() + " : 해당 코드가 없습니다.", "code.not.exist.exception"), HttpStatus.NO_CONTENT);
    }

    @ExceptionHandler(OutOfRangeException.class)
    public ResponseEntity handleOutOfRangeException(OutOfRangeException e) {

        return new ResponseEntity<>(new ErrorResponse(e.getMessage(), "out.of.range.exception"), HttpStatus.BAD_REQUEST);
    }
}