package kr.goci.goa.value.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@SpringBootTest
public class ValueControllerTest {
    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
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


}