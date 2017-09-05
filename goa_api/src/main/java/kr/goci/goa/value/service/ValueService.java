package kr.goci.goa.value.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

@Service
@Slf4j
public class ValueService {
    private String SERVER_NAME = "http://localhost";

    public String[][] getValue(String date, String pos, String zoom, String type) throws FileNotFoundException {
        String[] dateInfo = date.split("-");
        String[][] values = new String[100][100];

        Scanner scan = new Scanner(new File("E:GOA_DATA/" + dateInfo[0] + "/" + dateInfo[1] + "/" + dateInfo[2] + "/" + dateInfo[3] + "/" + type + "/" + zoom + "/" + pos + ".db"));
        String raw;

        int x = 0;
        int y = 0;

        while (scan.hasNext()) {
            raw = scan.nextLine();
            if (raw.equals("NaN")) raw = "";

            values[x][y++] = raw;

            if (y == 100) {
                x++;
                y = 0;
            }
        }
        return values;
    }

    public String[][][] getLonLat(String pos, String zoom) throws FileNotFoundException {
        String[] path = {"E:/GOA_DATA/ETC/lon" + zoom + "/" + pos + ".db", "E:/GOA_DATA/ETC/lat" + zoom + "/" + pos + ".db"};
        String[][][] values = new String[2][100][100];

        for (int i = 0; i < 2; i++) {
            Scanner scan = new Scanner(new File(path[i]));
            String raw;
            int x = 0;
            int y = 0;
            while (scan.hasNext()) {
                raw = scan.nextLine();

                values[i][x][y++] = raw;
                if (y == 100) {
                    x++;
                    y = 0;
                }
            }
        }
        return values;
    }
}
