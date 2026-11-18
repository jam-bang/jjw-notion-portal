import "server-only";
import { Client } from "@notionhq/client";

/** Notion 환경 변수가 모두 설정되어 있는지 */
export function isNotionConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);
}

let client: Client | null = null;

/** 서버 전용 Notion 클라이언트 (NOTION_API_KEY는 클라이언트 번들에 포함되지 않음) */
export function getNotionClient(): Client {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY 환경 변수가 설정되지 않았습니다.");
  }
  client ??= new Client({ auth: process.env.NOTION_API_KEY });
  return client;
}

export function getDatabaseId(): string {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) throw new Error("NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.");
  return id;
}
