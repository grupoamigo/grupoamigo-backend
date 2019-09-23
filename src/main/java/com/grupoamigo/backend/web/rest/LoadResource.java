package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.domain.Load;
import com.grupoamigo.backend.repository.LoadRepository;
import com.grupoamigo.backend.repository.search.LoadSearchRepository;
import com.grupoamigo.backend.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.grupoamigo.backend.domain.Load}.
 */
@RestController
@RequestMapping("/api")
public class LoadResource {

    private final Logger log = LoggerFactory.getLogger(LoadResource.class);

    private static final String ENTITY_NAME = "load";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LoadRepository loadRepository;

    private final LoadSearchRepository loadSearchRepository;

    public LoadResource(LoadRepository loadRepository, LoadSearchRepository loadSearchRepository) {
        this.loadRepository = loadRepository;
        this.loadSearchRepository = loadSearchRepository;
    }

    /**
     * {@code POST  /loads} : Create a new load.
     *
     * @param load the load to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new load, or with status {@code 400 (Bad Request)} if the load has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/loads")
    public ResponseEntity<Load> createLoad(@Valid @RequestBody Load load) throws URISyntaxException {
        log.debug("REST request to save Load : {}", load);
        if (load.getId() != null) {
            throw new BadRequestAlertException("A new load cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Load result = loadRepository.save(load);
        loadSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/loads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /loads} : Updates an existing load.
     *
     * @param load the load to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated load,
     * or with status {@code 400 (Bad Request)} if the load is not valid,
     * or with status {@code 500 (Internal Server Error)} if the load couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/loads")
    public ResponseEntity<Load> updateLoad(@Valid @RequestBody Load load) throws URISyntaxException {
        log.debug("REST request to update Load : {}", load);
        if (load.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Load result = loadRepository.save(load);
        loadSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, load.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /loads} : get all the loads.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of loads in body.
     */
    @GetMapping("/loads")
    public List<Load> getAllLoads(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Loads");
        return loadRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /loads/:id} : get the "id" load.
     *
     * @param id the id of the load to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the load, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/loads/{id}")
    public ResponseEntity<Load> getLoad(@PathVariable Long id) {
        log.debug("REST request to get Load : {}", id);
        Optional<Load> load = loadRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(load);
    }

    /**
     * {@code DELETE  /loads/:id} : delete the "id" load.
     *
     * @param id the id of the load to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/loads/{id}")
    public ResponseEntity<Void> deleteLoad(@PathVariable Long id) {
        log.debug("REST request to delete Load : {}", id);
        loadRepository.deleteById(id);
        loadSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/loads?query=:query} : search for the load corresponding
     * to the query.
     *
     * @param query the query of the load search.
     * @return the result of the search.
     */
    @GetMapping("/_search/loads")
    public List<Load> searchLoads(@RequestParam String query) {
        log.debug("REST request to search Loads for query {}", query);
        return StreamSupport
            .stream(loadSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
