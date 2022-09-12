export interface ClientConfig {
  paymasterAddress?: string
  entryPointAddress: string
  bundlerUrl: string
  chainId: number
}

const ClientConfigation = {
  paymasterAddress: "",
  entryPointAddress: "",
  bundlerUrl: "",
  chainId: 8001,
}

export {
  ClientConfigation
} 