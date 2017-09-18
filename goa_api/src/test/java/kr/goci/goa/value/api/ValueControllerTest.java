package kr.goci.goa.value.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.goci.goa.file.domain.ImageDto;
import kr.goci.goa.file.domain.Product;
import kr.goci.goa.file.domain.ProductDto;
import kr.goci.goa.file.service.FileService;
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
public class ValueControllerTest
{
    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private FileService fileService;


    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    private ProductDto.Create productCreateFixture() {
        ProductDto.Create product = new ProductDto.Create();
        product.setDate("2017-09-03-07");
        product.setStartX(300);
        product.setStartY(300);
        product.setEndX(1000);
        product.setEndY(1000);
        product.setType("CDOM");
        product.setOutputType("he5");

        return product;
    }

    @Before
    public void setUp() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .build();
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
    public void generate_Product_OK() throws Exception {
        ResultActions result = mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productCreateFixture())));

        result.andDo(print());
        result.andExpect(status().isCreated());
    }

//    @Test
//    public void generate_Product_Out_Of_Range() throws Exception {
//        ProductDto.Create product = new ProductDto.Create();
//
//        product.setDate("2017-09-03-07");
//        product.setStartX(300);
//        product.setStartY(300);
//        product.setEndX(1000);
//        product.setEndY(1000);
//        product.setType("CDOM");
//        product.setOutputType("he5");
//
//
//        product.setDate("2017-09-03-07");
//        product.setStartX(-4);
//        product.setStartY(1436);
//        product.setEndX(2132);
//        product.setEndY(2512);
//        product.setType("CDOM");
//        product.setOutputType("nc");
//
//        ResultActions result = mockMvc.perform(post("/api/products")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(product)));
//
//        result.andDo(print());
//        result.andExpect(status().isBadRequest());
//    }

    //todo 나중에
//    @Test
//    public void generate_Product_BAD_REQUEST() throws Exception {
//        ProductDto.Create product = new ProductDto.Create();
//        product.setDate("1991-09-03-07");
//        product.setStartX(1028);
//        product.setStartY(1436);
//        product.setEndX(2132);
//        product.setEndY(2512);
//        product.setType("CDOM");
//        product.setOutputType("nc");
//
//        ResultActions result = mockMvc.perform(post("/api/products")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(product)));
//
//        result.andDo(print());
//        result.andExpect(status().isBadRequest());
//    }
//
//    @Test
//    public void downloadProduct() throws Exception {
//        ProductDto.Response res = fileService.makeProduct(productCreateFixture());
//
//        ResultActions result = mockMvc.perform(get("/api/products/productId/" + res.getProductId()));
//
//        result.andExpect(status().isOk());
//    }

    @Test
    public void downloadProduct_No_Content() throws Exception {
        ResultActions result = mockMvc.perform(get("/api/products/productId/sadasdZ2"));

        result.andDo(print());
        result.andExpect(status().isNoContent());
    }
}