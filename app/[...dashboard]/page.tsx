import ChatWindow from "@/app/[...dashboard]/rcc/ChatWindow";

type Props = {
  params: Promise<{ dashboard?: string[] }>;
};

export default async function DashboardPage({ params }: Props) {
  const segments = (await params).dashboard ?? [];
  const last = segments[segments.length - 1];
  const roomId = last && last !== "dashboard" ? last : undefined;

  return <ChatWindow roomId={roomId} />;
}
