'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaPlusCircle, FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);

    // Carregar categorias do localStorage
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('categorias')) || [];
        setCategorias(data);
    }, []);

    // Função para excluir uma categoria
    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const atualizados = categorias.filter(item => item.id !== id);
            localStorage.setItem('categorias', JSON.stringify(atualizados));
            setCategorias(atualizados);
        }
    }

    return (
        <>
            <header id="cabecalho" className="text-center my-3">
                <Link href="/home" passHref>
                    <img src="/imagens/rbg.png" alt="Logo The Burguer" width={350} height={350} />
                </Link>
            </header>
            <div className="container">
                <header id="cabecalho">
                    <h1 className="mb-4">Categorias</h1>
                </header>
                <Link href="/categoria/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo
                </Link>

                <Table className="custom-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((item) => (
                            <tr key={item.id}>
                                <td className="actions">
                                    <Link href={`/categoria/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary me-2 hover-icon" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger hover-icon"
                                        onClick={() => excluir(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                                <td>{item.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
