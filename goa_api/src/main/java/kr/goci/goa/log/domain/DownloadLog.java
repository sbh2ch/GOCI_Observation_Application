package kr.goci.goa.log.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DownloadLog {
    @Id
    @GeneratedValue
    private Long id;
    private String filename;
    private String type;
    private String outputType;
    private String ip;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
