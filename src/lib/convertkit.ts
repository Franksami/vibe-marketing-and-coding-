interface ConvertKitSubscriber {
  email: string;
  first_name?: string;
  fields?: Record<string, string | number | boolean>;
  tags?: number[];
}

interface ConvertKitResponse {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    source: string;
    referrer: string;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
      email_address: string;
      state: string;
      created_at: string;
      fields: Record<string, string | number | boolean>;
    };
  };
}

export class ConvertKitClient {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.convertkit.com/v3';

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async addSubscriberToForm(formId: string, subscriber: ConvertKitSubscriber): Promise<ConvertKitResponse> {
    const url = `${this.baseUrl}/forms/${formId}/subscribe`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
        email: subscriber.email,
        first_name: subscriber.first_name,
        fields: subscriber.fields,
        tags: subscriber.tags,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ConvertKit API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async addSubscriberWithWebhook(email: string, formId: string): Promise<boolean> {
    try {
      const result = await this.addSubscriberToForm(formId, { email });
      console.log('[ConvertKit] API Response:', {
        subscriberId: result.subscription.subscriber.id,
        state: result.subscription.state,
        email: email,
        formId: formId
      });
      return result.subscription.state === 'active' || result.subscription.state === 'inactive';
    } catch (error) {
      console.error('[ConvertKit] Subscription error:', error);
      return false;
    }
  }

  async tagSubscriber(email: string, tagId: number): Promise<ConvertKitResponse> {
    const url = `${this.baseUrl}/tags/${tagId}/subscribe`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: this.apiSecret,
        email,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ConvertKit tag error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // Note: Broadcasts require OAuth, so use ConvertKit's visual automations for welcome emails
}

// Helper function to create client
export function createConvertKitClient() {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const apiSecret = process.env.CONVERTKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('ConvertKit API credentials not configured');
  }

  return new ConvertKitClient(apiKey, apiSecret);
}