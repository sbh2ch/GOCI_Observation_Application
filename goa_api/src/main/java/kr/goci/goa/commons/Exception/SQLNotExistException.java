package kr.goci.goa.commons.Exception;

import lombok.Getter;

@Getter
public class SQLNotExistException extends RuntimeException {
    private String filename;

    public SQLNotExistException(String filename) {
        this.filename = filename;
    }
}
