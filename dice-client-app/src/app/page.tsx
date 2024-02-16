import { Flex, Text, Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex direction="column" gap="2">
        <Text>Welcome to DICE</Text>
        <Button size="2" variant="soft">
          로그인
        </Button>
      </Flex>
    </main>
  );
}
