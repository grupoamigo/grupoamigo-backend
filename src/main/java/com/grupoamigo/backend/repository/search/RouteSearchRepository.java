package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Route;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Route} entity.
 */
public interface RouteSearchRepository extends ElasticsearchRepository<Route, Long> {
}
