package kr.goci.goa.value.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.goci.goa.commons.ErrorResponse;
import kr.goci.goa.value.service.ValueService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;

@CrossOrigin("*")
@RestController
@Slf4j
@Transactional
public class ValueController {
    @Autowired
    private ValueService valueService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/api/{date}/{pos}/{zoom}/{type}")
    public ResponseEntity getValue(@PathVariable String date, @PathVariable String pos, @PathVariable String zoom, @PathVariable String type) {
        String values;

        try {
            values = objectMapper.writeValueAsString(valueService.getValue(date, pos, zoom, type));
        } catch (FileNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse("잘못된 요청", "bad.request"), HttpStatus.BAD_REQUEST);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorResponse("파싱 실패", "parsing.error"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(values, HttpStatus.OK);
    }

    @GetMapping("/api/lonlat/{pos}/{zoom}")
    public ResponseEntity getLatLon(@PathVariable String pos, @PathVariable String zoom) {
        String values;

        try {
            values = objectMapper.writeValueAsString(valueService.getLonLat(pos, zoom));
        } catch (FileNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse("잘못된 요청", "bad.request"), HttpStatus.BAD_REQUEST);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorResponse("파싱 실패", "parsing.error"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(values, HttpStatus.OK);
    }
}
