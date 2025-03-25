import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByHash } from "../api/multiversx";
import { formatTimeAgo } from "../utils/formatting";
import { TransactionDetails } from "../api/multiversx";
import { useEffect } from "react";

export default function TransactionDetail() {
  const { hash } = useParams<{ hash: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hash) {
      console.error('Nenhum hash fornecido');
      navigate('/transactions');
    }
  }, [hash, navigate]);

  const { data: transaction, isLoading, error } = useQuery({
    queryKey: ['transaction', hash],
    queryFn: () => hash ? getTransactionByHash(hash) : null,
    enabled: !!hash,
    retry: 1
  });

  console.log('Estado da consulta da transação:', { 
    hash, 
    isLoading, 
    error,
    transaction 
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <p>Carregando detalhes da transação...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-red-500/20 text-red-500 p-4 rounded-lg">
          <p>Erro ao carregar detalhes da transação: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-yellow-500/20 text-yellow-500 p-4 rounded-lg">
          <p>Transação não encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Detalhes da Transação</h1>
        <div className="flex gap-2">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Transaction Details
          </button>
          <button className="bg-gray-800/50 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700">
            Logs
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="space-y-6">
          {/* Hash e Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-gray-400 text-sm mb-2">Hash</h2>
              <div className="flex items-center gap-2 bg-gray-900/50 p-3 rounded">
                <p className="font-mono text-sm text-white break-all">{transaction.hash}</p>
                <button className="text-blue-500 hover:text-blue-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-gray-400 text-sm mb-2">Status</h2>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm ${
                  transaction.status === 'success' ? 'bg-green-500/20 text-green-500' : 
                  transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                  'bg-red-500/20 text-red-500'
                }`}>
                  {transaction.status}
                </span>
              </div>

              <div>
                <h2 className="text-gray-400 text-sm mb-2">Age</h2>
                <p className="text-white text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTimeAgo(transaction.timestamp)}
                </p>
              </div>
            </div>
          </div>

          {/* From e To */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-gray-400 text-sm mb-2">From</h2>
              <div className="bg-gray-900/50 p-3 rounded">
                <div className="flex items-center gap-2">
                  <Link to={`/account/${transaction.sender}`} className="font-mono text-sm text-white hover:text-blue-400 break-all">
                    {transaction.sender}
                  </Link>
                  <span className="text-gray-400 text-sm whitespace-nowrap">(Shard {transaction.senderShard || '1'})</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-gray-400 text-sm mb-2">To</h2>
              <div className="bg-gray-900/50 p-3 rounded">
                <div className="flex items-center gap-2">
                  <Link to={`/account/${transaction.receiver}`} className="font-mono text-sm text-white hover:text-blue-400 break-all">
                    {transaction.receiver}
                  </Link>
                  <span className="text-gray-400 text-sm whitespace-nowrap">(Shard {transaction.receiverShard || '1'})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Value e Fee */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-gray-400 text-sm mb-2">Value</h2>
              <div className="bg-gray-900/50 p-3 rounded">
                <p className="text-white text-sm flex items-center gap-2">
                  <span className="text-blue-500">⚡</span>
                  {Number(transaction.value) / Math.pow(10, 18)} EGLD
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-gray-400 text-sm mb-2">Transaction Fee</h2>
              <div className="bg-gray-900/50 p-3 rounded">
                <p className="text-white text-sm flex items-center gap-2">
                  <span className="text-blue-500">⚡</span>
                  {Number(transaction.fee) / Math.pow(10, 18)} EGLD
                </p>
              </div>
            </div>
          </div>

          {/* Gas Info */}
          <div>
            <h2 className="text-gray-400 text-sm mb-2">Gas Information</h2>
            <div className="bg-gray-900/50 p-3 rounded">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Gas Price</p>
                  <p className="text-white text-sm">{transaction.gasPrice || '0.00000001'} EGLD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Gas Limit</p>
                  <p className="text-white text-sm">{transaction.gasLimit?.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Gas Used</p>
                  <p className="text-white text-sm">{transaction.gasUsed?.toLocaleString() || '0'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Miniblock */}
          {transaction.miniBlockHash && (
            <div>
              <h2 className="text-gray-400 text-sm mb-2">Miniblock</h2>
              <div className="bg-gray-900/50 p-3 rounded">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm text-white break-all">{transaction.miniBlockHash}</p>
                  <button className="text-blue-500 hover:text-blue-400 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Method e Action */}
          {(transaction.function || transaction.data) && (
            <div className="space-y-4">
              {transaction.function && (
                <div>
                  <h2 className="text-gray-400 text-sm mb-2">Method</h2>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <p className="font-mono text-sm text-white">{transaction.function}</p>
                  </div>
                </div>
              )}

              {transaction.data && (
                <div>
                  <h2 className="text-gray-400 text-sm mb-2">Transaction Action</h2>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <p className="font-mono text-sm text-white break-all">{transaction.data}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Token Operations */}
          {transaction.operations && transaction.operations.length > 0 && (
            <div>
              <h2 className="text-gray-400 text-sm mb-2">Token Operations</h2>
              <div className="space-y-2">
                {transaction.operations.map((op: any, index: number) => (
                  <div key={index} className="bg-gray-900/50 p-3 rounded">
                    <pre className="text-sm text-white overflow-x-auto whitespace-pre-wrap break-all">
                      {JSON.stringify(op, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}