import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private sentMessages: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.sentMessages.push({
      to,
      body,
    });
  }
}
