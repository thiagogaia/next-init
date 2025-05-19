#!/usr/bin/env tsx

import { execSync } from 'child_process';
import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

const dbPath = 'infra/db';
const migrationsPath = path.resolve(dbPath, 'migrations');

const log = (msg: string) => console.log(`\n🔹 ${msg}\n`);

function run(cmd: string) {
  try {
    execSync(cmd, { cwd: dbPath, stdio: 'inherit' });
  } catch (e) {
    console.error(`\n❌ Erro ao executar: ${cmd}\n`);
    process.exit(1);
  }
}

// Usar Migration: 
// 1. Criar migrations: drizzle-kit generate
// 2. Aplicar migrations: drizzle-kit migrate
// 3. Verificar migrations: drizzle-kit check
// 4. Reverter migrations: drizzle-kit drop
// 5. Não usar Aplicar migrations: drizzle-kit push, pois não controla as migrations pelo banco de dados
async function main() {
  const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: 'O que você deseja fazer com o Drizzle ORM?',
    choices: [
      { title: '🚀 Push (Aplicar mudanças e sincronizar com banco) - push', value: 'push' },
      { title: '📝 Generate (Gerar migrations .sql sem aplicar) - generate', value: 'generate' },
      { title: '💣 Drop - Rollback', value: 'drop' },
      { title: '🔄 Migrate (Aplicar migrations .sql) - migrate', value: 'migrate' },
      { title: '🔍 Verificar - check', value: 'check' },      
      { title: '📦 Postgres up - docker-compose up -d', value: 'dockerup' },
      { title: '🗑️  Posgres down - docker-compose down', value: 'dockerdown' },
      { title: '👋 Sair', value: 'exit' }
    ]
  });

  if (action === 'exit') {
    log('Até mais!');
    process.exit(0);
  }

  if (action === 'push') {
    log('Executando: drizzle-kit push');
    run('npx drizzle-kit push');
  }

  if (action === 'generate') {
    log('Executando: drizzle-kit generate');
    run('npx drizzle-kit generate');
  }

  if (action === 'migrate') {
    const hasMigrations = fs.existsSync(migrationsPath) && fs.readdirSync(migrationsPath).length > 0;

    if (!hasMigrations) {
      console.error('\n❌ Nenhuma migration encontrada em drizzle/migrations. Rode `generate` antes de usar migrate.\n');
      process.exit(1);
    }

    const confirm = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Tem certeza que deseja MIGRAR e Alterar o banco?',
      initial: false,
    });

    if (!confirm.value) {
      log('Operação cancelada.');
      process.exit(0);
    }

    log('Executando: drizzle-kit migrate');
    run('npx drizzle-kit migrate');
  }

  if (action === 'check') {
    log('Executando: drizzle-kit check');
    run('npx drizzle-kit check');
  }

  if (action === 'drop') {
    log('Executando: drizzle-kit drop');
    run('npx drizzle-kit drop');
  }

  if (action === 'dockerup') {
    log('Executando: docker-compose up -d');
    run('docker-compose up -d');
  }

  if (action === 'dockerdown') {
    log('Executando: docker-compose down -v');
    run('docker-compose down');
  }
}

main();
