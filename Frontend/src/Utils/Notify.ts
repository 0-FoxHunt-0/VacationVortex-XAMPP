import { Notyf } from "notyf";

class Notify {
  public notyf = new Notyf({
    duration: 3000,
    position: { x: "right", y: "bottom" },
    ripple: true,
    dismissible: true,
  });

  public success(message: string): void {
    this.notyf.success(message);
  }

  public error(err: any): void {
    const message = this.extractErrorMessage(err);
    this.notyf.error(message);
  }

  private extractErrorMessage(err: any): string {
    if (typeof err === "string") return err;

    if (typeof err.response.data === "string") return err.response.data;

    if (typeof err.message === "string") return err.message;

    return "Unknown Error, please try again";
  }
}

const notify = new Notify();

export default notify;
