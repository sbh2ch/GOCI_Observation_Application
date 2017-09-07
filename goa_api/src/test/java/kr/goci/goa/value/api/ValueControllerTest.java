package kr.goci.goa.value.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.goci.goa.file.domain.Image;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@SpringBootTest
public class ValueControllerTest {
    @Autowired
    private WebApplicationContext wac;


    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Before
    public void setUp() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void getValue_OK() throws Exception {
        ResultActions result = mockMvc.perform(get("/api/2017-09-03-07/3-2/3/CDOM"));

        result.andExpect(status().isOk());
    }

    @Test
    public void getValue_BAD_PARAMETER() throws Exception {
        ResultActions result = mockMvc.perform(get("/api/1999-03-04-00/3-3/3/CDOM"));

        result.andDo(print());
        result.andExpect(status().isBadRequest());
    }

    @Test
    public void getLatLon_OK() throws Exception {
        ResultActions result = mockMvc.perform(get("/api/lonlat/3-2/3"));

        result.andExpect(status().isOk());
    }

    @Test
    public void getLatLon_BAD_PARAMETER() throws Exception {
        ResultActions result = mockMvc.perform(get("/api/lonlat/00-00/0"));

        result.andDo(print());
        result.andExpect(status().isBadRequest());
    }

    @Test
    public void generate_Image_OK() throws Exception {
        Image.Create image = new Image.Create();
        image.setDate("2017-09-03-07");
        image.setStartX(1028);
        image.setStartY(1436);
        image.setEndX(2132);
        image.setEndY(2512);
        image.setType("CDOM");

        ResultActions result = mockMvc
                .perform(post("/api/images")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(image)));

        result.andDo(print());
        result.andExpect(status().isOk());
    }

    @Test
    public void generate_Image_BAD_REQUEST() throws Exception {
        Image.Create image = new Image.Create();
        image.setDate("1991-09-03-07");
        image.setStartX(1028);
        image.setStartY(1436);
        image.setEndX(2132);
        image.setEndY(2512);
        image.setType("CDOM");

        ResultActions result = mockMvc
                .perform(post("/api/images")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(image)));

        result.andDo(print());
        result.andExpect(status().isBadRequest());
    }
}