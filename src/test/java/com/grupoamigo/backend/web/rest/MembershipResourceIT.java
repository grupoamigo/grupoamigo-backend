package com.grupoamigo.backend.web.rest;

import com.grupoamigo.backend.GrupoamigoBackendApp;
import com.grupoamigo.backend.domain.Membership;
import com.grupoamigo.backend.repository.MembershipRepository;
import com.grupoamigo.backend.repository.search.MembershipSearchRepository;
import com.grupoamigo.backend.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static com.grupoamigo.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.grupoamigo.backend.domain.enumeration.MembershipRole;
import com.grupoamigo.backend.domain.enumeration.MembershipLevelType;
/**
 * Integration tests for the {@link MembershipResource} REST controller.
 */
@SpringBootTest(classes = GrupoamigoBackendApp.class)
public class MembershipResourceIT {

    private static final MembershipRole DEFAULT_ROLE = MembershipRole.CEO;
    private static final MembershipRole UPDATED_ROLE = MembershipRole.VP;

    private static final Instant DEFAULT_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_CREATED = Instant.ofEpochMilli(-1L);

    private static final LocalDate DEFAULT_EXPIRES = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRES = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_EXPIRES = LocalDate.ofEpochDay(-1L);

    private static final MembershipLevelType DEFAULT_ACCOUNT_LEVEL = MembershipLevelType.FREE;
    private static final MembershipLevelType UPDATED_ACCOUNT_LEVEL = MembershipLevelType.BASIC;

    @Autowired
    private MembershipRepository membershipRepository;

    /**
     * This repository is mocked in the com.grupoamigo.backend.repository.search test package.
     *
     * @see com.grupoamigo.backend.repository.search.MembershipSearchRepositoryMockConfiguration
     */
    @Autowired
    private MembershipSearchRepository mockMembershipSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMembershipMockMvc;

    private Membership membership;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MembershipResource membershipResource = new MembershipResource(membershipRepository, mockMembershipSearchRepository);
        this.restMembershipMockMvc = MockMvcBuilders.standaloneSetup(membershipResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membership createEntity(EntityManager em) {
        Membership membership = new Membership()
            .role(DEFAULT_ROLE)
            .created(DEFAULT_CREATED)
            .expires(DEFAULT_EXPIRES)
            .accountLevel(DEFAULT_ACCOUNT_LEVEL);
        return membership;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membership createUpdatedEntity(EntityManager em) {
        Membership membership = new Membership()
            .role(UPDATED_ROLE)
            .created(UPDATED_CREATED)
            .expires(UPDATED_EXPIRES)
            .accountLevel(UPDATED_ACCOUNT_LEVEL);
        return membership;
    }

    @BeforeEach
    public void initTest() {
        membership = createEntity(em);
    }

    @Test
    @Transactional
    public void createMembership() throws Exception {
        int databaseSizeBeforeCreate = membershipRepository.findAll().size();

        // Create the Membership
        restMembershipMockMvc.perform(post("/api/memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membership)))
            .andExpect(status().isCreated());

        // Validate the Membership in the database
        List<Membership> membershipList = membershipRepository.findAll();
        assertThat(membershipList).hasSize(databaseSizeBeforeCreate + 1);
        Membership testMembership = membershipList.get(membershipList.size() - 1);
        assertThat(testMembership.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testMembership.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testMembership.getExpires()).isEqualTo(DEFAULT_EXPIRES);
        assertThat(testMembership.getAccountLevel()).isEqualTo(DEFAULT_ACCOUNT_LEVEL);

        // Validate the Membership in Elasticsearch
        verify(mockMembershipSearchRepository, times(1)).save(testMembership);
    }

    @Test
    @Transactional
    public void createMembershipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = membershipRepository.findAll().size();

        // Create the Membership with an existing ID
        membership.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMembershipMockMvc.perform(post("/api/memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membership)))
            .andExpect(status().isBadRequest());

        // Validate the Membership in the database
        List<Membership> membershipList = membershipRepository.findAll();
        assertThat(membershipList).hasSize(databaseSizeBeforeCreate);

        // Validate the Membership in Elasticsearch
        verify(mockMembershipSearchRepository, times(0)).save(membership);
    }


    @Test
    @Transactional
    public void getAllMemberships() throws Exception {
        // Initialize the database
        membershipRepository.saveAndFlush(membership);

        // Get all the membershipList
        restMembershipMockMvc.perform(get("/api/memberships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membership.getId().intValue())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(DEFAULT_CREATED.toString())))
            .andExpect(jsonPath("$.[*].expires").value(hasItem(DEFAULT_EXPIRES.toString())))
            .andExpect(jsonPath("$.[*].accountLevel").value(hasItem(DEFAULT_ACCOUNT_LEVEL.toString())));
    }
    
    @Test
    @Transactional
    public void getMembership() throws Exception {
        // Initialize the database
        membershipRepository.saveAndFlush(membership);

        // Get the membership
        restMembershipMockMvc.perform(get("/api/memberships/{id}", membership.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(membership.getId().intValue()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()))
            .andExpect(jsonPath("$.created").value(DEFAULT_CREATED.toString()))
            .andExpect(jsonPath("$.expires").value(DEFAULT_EXPIRES.toString()))
            .andExpect(jsonPath("$.accountLevel").value(DEFAULT_ACCOUNT_LEVEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMembership() throws Exception {
        // Get the membership
        restMembershipMockMvc.perform(get("/api/memberships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMembership() throws Exception {
        // Initialize the database
        membershipRepository.saveAndFlush(membership);

        int databaseSizeBeforeUpdate = membershipRepository.findAll().size();

        // Update the membership
        Membership updatedMembership = membershipRepository.findById(membership.getId()).get();
        // Disconnect from session so that the updates on updatedMembership are not directly saved in db
        em.detach(updatedMembership);
        updatedMembership
            .role(UPDATED_ROLE)
            .created(UPDATED_CREATED)
            .expires(UPDATED_EXPIRES)
            .accountLevel(UPDATED_ACCOUNT_LEVEL);

        restMembershipMockMvc.perform(put("/api/memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMembership)))
            .andExpect(status().isOk());

        // Validate the Membership in the database
        List<Membership> membershipList = membershipRepository.findAll();
        assertThat(membershipList).hasSize(databaseSizeBeforeUpdate);
        Membership testMembership = membershipList.get(membershipList.size() - 1);
        assertThat(testMembership.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testMembership.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testMembership.getExpires()).isEqualTo(UPDATED_EXPIRES);
        assertThat(testMembership.getAccountLevel()).isEqualTo(UPDATED_ACCOUNT_LEVEL);

        // Validate the Membership in Elasticsearch
        verify(mockMembershipSearchRepository, times(1)).save(testMembership);
    }

    @Test
    @Transactional
    public void updateNonExistingMembership() throws Exception {
        int databaseSizeBeforeUpdate = membershipRepository.findAll().size();

        // Create the Membership

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMembershipMockMvc.perform(put("/api/memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membership)))
            .andExpect(status().isBadRequest());

        // Validate the Membership in the database
        List<Membership> membershipList = membershipRepository.findAll();
        assertThat(membershipList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Membership in Elasticsearch
        verify(mockMembershipSearchRepository, times(0)).save(membership);
    }

    @Test
    @Transactional
    public void deleteMembership() throws Exception {
        // Initialize the database
        membershipRepository.saveAndFlush(membership);

        int databaseSizeBeforeDelete = membershipRepository.findAll().size();

        // Delete the membership
        restMembershipMockMvc.perform(delete("/api/memberships/{id}", membership.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Membership> membershipList = membershipRepository.findAll();
        assertThat(membershipList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Membership in Elasticsearch
        verify(mockMembershipSearchRepository, times(1)).deleteById(membership.getId());
    }

    @Test
    @Transactional
    public void searchMembership() throws Exception {
        // Initialize the database
        membershipRepository.saveAndFlush(membership);
        when(mockMembershipSearchRepository.search(queryStringQuery("id:" + membership.getId())))
            .thenReturn(Collections.singletonList(membership));
        // Search the membership
        restMembershipMockMvc.perform(get("/api/_search/memberships?query=id:" + membership.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membership.getId().intValue())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(DEFAULT_CREATED.toString())))
            .andExpect(jsonPath("$.[*].expires").value(hasItem(DEFAULT_EXPIRES.toString())))
            .andExpect(jsonPath("$.[*].accountLevel").value(hasItem(DEFAULT_ACCOUNT_LEVEL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Membership.class);
        Membership membership1 = new Membership();
        membership1.setId(1L);
        Membership membership2 = new Membership();
        membership2.setId(membership1.getId());
        assertThat(membership1).isEqualTo(membership2);
        membership2.setId(2L);
        assertThat(membership1).isNotEqualTo(membership2);
        membership1.setId(null);
        assertThat(membership1).isNotEqualTo(membership2);
    }
}
