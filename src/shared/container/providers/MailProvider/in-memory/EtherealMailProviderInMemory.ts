import { IMailProvider } from "../IMailProvider";

class EtherealMailProviderInMemory implements IMailProvider {
  message: unknown[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { EtherealMailProviderInMemory };
