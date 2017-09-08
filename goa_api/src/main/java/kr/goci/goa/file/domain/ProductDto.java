package kr.goci.goa.file.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.hateoas.ResourceSupport;

public class ProductDto {
    @Data
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Create {
        private String hashcode;
        private String outputType;
    }

    @Data
    @AllArgsConstructor
    public static class Response extends ResourceSupport {
        private String name;
    }
}