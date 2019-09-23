package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Contract;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Contract} entity.
 */
public interface ContractSearchRepository extends ElasticsearchRepository<Contract, Long> {
}
