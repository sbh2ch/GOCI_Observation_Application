package kr.goci.goa.file.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.goci.goa.commons.ErrorResponse;
import kr.goci.goa.file.domain.ImageDto;
import kr.goci.goa.file.domain.ProductDto;
import kr.goci.goa.file.service.FileService;
import kr.goci.goa.log.domain.Log;
import kr.goci.goa.log.service.LogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@Slf4j
@Transactional
public class FileController {
    @Autowired
    private LogService logService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/api/images/paths/{path}/names/{name}")
    public ResponseEntity displayImage(@PathVariable String path, @PathVariable String name) {
        byte[] image;

        try {
            image = fileService.displayImage(path, name);
        } catch (IOException e) {
            log.error("image.file.IO.Exception, {}", e.toString());

            return new ResponseEntity<>(new ErrorResponse("잘못된 요청입니다.", "bad.request.show.image"), HttpStatus.BAD_REQUEST);
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
            return new ResponseEntity<>(new ErrorResponse("잘못된 요청입니다.", "bad.request.create.image"), HttpStatus.BAD_REQUEST);
        }

        String result = null;

        try {
            result = objectMapper.writeValueAsString(res);
        } catch (JsonProcessingException e) {
            log.error("json parsing error : {}", e.toString());
            return new ResponseEntity<>(new ErrorResponse("파싱 실패", "parsing.fail"), HttpStatus.CONFLICT);
        }

//        Product.Response res = new Product.Response(1, 1, 3, 3, "2017-09-05-03", "CDOM");
//
//        res.add(new Link("http://localhost:8080/api/1999-03-04-00/3-3/3/CDOM").withRel("img"));


        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping(value = "/api/products", produces = "appication/json;charset=UTF-8")
    public ResponseEntity makeProduct(@RequestBody ProductDto.Create product) {
        ProductDto.Response res;
        try {
            res = fileService.makeProduct(product);
        } catch (Exception e) {
            log.error("product create error : {}", e.toString());
            return new ResponseEntity<>(new ErrorResponse("잘못된 요청입니다.", "bad.request.create.product"), HttpStatus.BAD_REQUEST);
        }

        String result = null;
        try {
            result = objectMapper.writeValueAsString(res);
        } catch (JsonProcessingException e) {
            log.error("json parsing error : {}", e.toString());
            return new ResponseEntity<>(new ErrorResponse("파싱 실패", "parsing.fail"), HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/api/products/hash/{hash}")
    public ResponseEntity getProduct(@PathVariable String hash) throws Exception {
        Log.Products test = fileService.test(hash);

        return new ResponseEntity<>(objectMapper.writeValueAsString(test), HttpStatus.OK);
    }
}