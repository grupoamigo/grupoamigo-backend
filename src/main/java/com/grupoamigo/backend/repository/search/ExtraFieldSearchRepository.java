package com.grupoamigo.backend.repository.search;

import com.grupoamigo.backend.domain.ExtraField;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ExtraField} entity.
 */
public interface ExtraFieldSearchRepository extends ElasticsearchRepository<ExtraField, Long> {
}
