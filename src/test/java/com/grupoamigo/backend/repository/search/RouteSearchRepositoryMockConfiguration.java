package com.grupoamigo.backend.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RouteSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RouteSearchRepositoryMockConfiguration {

    @MockBean
    private RouteSearchRepository mockRouteSearchRepository;

}
