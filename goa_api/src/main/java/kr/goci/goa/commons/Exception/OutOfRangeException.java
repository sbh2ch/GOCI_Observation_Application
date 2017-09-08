package kr.goci.goa.commons.Exception;

import lombok.Getter;

@Getter
public class OutOfRangeException extends RuntimeException {
    private String message;

    public OutOfRangeException(String message) {
        this.message = message;
    }
}
