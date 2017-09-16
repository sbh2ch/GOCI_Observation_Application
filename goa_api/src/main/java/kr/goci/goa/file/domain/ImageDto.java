package kr.goci.goa.file.domain;

import lombok.Data;
import lombok.ToString;
import org.springframework.hateoas.ResourceSupport;

public class ImageDto {
    @Data
    public static class Temp {
        private int startX;
        private int startY;
        private int endX;
        private int endY;
        private String date;
        private String type;
    }

    @Data
    @ToString
    public static class Create {
        private int startX;
        private int startY;
        private int endX;
        private int endY;
        private String date;
        private String type;
    }

    @Data
    public static class Response extends ResourceSupport {
        private String hashcode;
    }
}
