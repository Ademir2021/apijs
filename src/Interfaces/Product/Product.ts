export type IProduct = {
    id: number
    name: string
    valMax: number
    valMin: number
    fkBrand: number
    fkSubSector: number
    fk_un_med: number
    barCode: string
    image: string
    fk_classe: number
    fk_grupo_fiscal: number
    fk_tipo_prod: number
    ncm: string
}

export type TProduct = {
    id_product: number
    descric_product: string
    val_max_product: number
    val_min_product: number
    fk_brand: number
    fk_sub_sector: number
    fk_un_med: number
    bar_code: string
    image: string
    fk_classe: number
    fk_grupo_fiscal: number
    fk_tipo_prod: number
    ncm: string
}

export type IBrand = {
    id: number
    name: string
}

export type ISubSector = {
    id: number
    name: string
    description?: string
}

export type IUnMed = {
    id_un: number
    un_med: string
};

export type IGrupoFiscal = {
    id_grupo_fiscal: number
    name_grupo_fiscal: string
    fk_tabela_trib: number
}

export type ITableTrib = {
    id_table_trib: number
    name_table: string
    icms_trib: number //integer
    icms_base: number //numeric float
    icms_aliq: number
    icms_obs: string
    iss_base: number
    iss_aliq: number
    sf_base: number
    sf_aliq: number
    ir_base: number
    ir_aliq: number
    cs_base: number
    cs_aliq: number
    pis_base: number
    pis_aliq: number
    cofins_base: number
    cofins_aliq: number
    ipi_aliq: number
    cst_pis: number
    cst_cofins: number
    cst_ipi: number
    icms_st_tributado: number
    icms_aliq_st: number
    icms_margem_st: number
    icms_usa_margem_st: string
    icms_mod_bc: number
    st_mod_bc: number
    icms_diferido: number
    csocn: number
    cod_trib_issqn: number
    cst_issqn_pref: number
    ipi_unit: number
    icms_aliq_uf_dest: number
    icms_aliq_interestadual: number
    fcp_uf_dest_perc: number
    fcp_uf_dest_base: number
    fcp_uf_dest_base_st: number
    fcp_uf_dest_perc_st: number
    cod_benef_fiscal: number
    natureza_receita_pis_cofins: number
}



export type IListProductQuery = {
    id_product: number
    descric_product: string
    fk_brand: number
    fk_sub_sector: number
}