export interface ClientConfig {
  paymasterAddress?: string
  entryPointAddress: string
  bundlerUrl: string
  chainId: number
}

const ClientConfiguration = {
  paymasterAddress: "",
  entryPointAddress: "",
  bundlerUrl: "",
  chainId: 8001,
}

export {
  ClientConfiguration
} 